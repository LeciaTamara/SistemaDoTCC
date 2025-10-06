import json
import os
from django.http import JsonResponse
from django.http import HttpResponse
from django.shortcuts import render
from django.utils.decorators import method_decorator
from gerarVoz import settings
from gtts import gTTS
import io
import traceback
from pydub import AudioSegment

#importações utilizadas pelo o rest framework
from rest_framework.views import APIView

from django.views.decorators.csrf import ensure_csrf_cookie


# Atividades
@method_decorator(ensure_csrf_cookie, name='get')
class VerSilabaSimpleAPIView(APIView):
    def get(self, request):
        return render(request, "jogoCarta/jogoCartasSimples.html")


@method_decorator(ensure_csrf_cookie, name='get')
class VerSilabaComplexaAPIView(APIView):
    def get(self, request):
        return render(request, "jogoCarta/jogoCartasComplexas.html")
    

@method_decorator(ensure_csrf_cookie, name='get')
class AlfabetoBastaoAPIView(APIView):
    def get(self, request):
        return render(request, "conhecimentoAlfabeto/alfabetoBastao.html")

@method_decorator(ensure_csrf_cookie, name='get')
class AlfabetoImpressoAPIView(APIView):
    def get(self, request):
        return render(request, "conhecimentoAlfabeto/alfabetoImpresso.html")

@method_decorator(ensure_csrf_cookie, name='get')
class AlfabetoCursivoAPIView(APIView):
    def get(self, request):
        return render(request, "conhecimentoAlfabeto/alfabetoCursivo.html")
    

@method_decorator(ensure_csrf_cookie, name='get')
class FamiliaSilabicaAPIView(APIView):
    def get(self, request):
        return render(request, 'familiaSilabica/familiaSilabica.html')

@method_decorator(ensure_csrf_cookie, name='get')
class VogalAPIView(APIView):
    def get(self, request):
        return render(request, 'conhecendoVogais/conhecendoVogais.html')
    
@method_decorator(ensure_csrf_cookie, name='get')
class ReescrevaPalavraFase1APIView(APIView):
    def get(self, request):
        return render(request, 'reescrevaPalavra/reescrevaPalavra_Fase1.html')

@method_decorator(ensure_csrf_cookie, name='get')
class ReescrevaPalavraFase2APIView(APIView):
    def get(self, request):
        return render(request, 'reescrevaPalavra/reescrevaPalavra_Fase2.html')
    
@method_decorator(ensure_csrf_cookie, name='get')
class RelacaoLetraFiguraAPIView(APIView):
    def get(self, request):
        return render(request, 'relacaoLetraFigura/relacaoLetraFigura.html')
    

# Página inicial
@method_decorator(ensure_csrf_cookie, name='get')
class IndexAPiView(APIView):
    def get(self, request):
        return render(request, "index.html")

# # Trilhas
# @method_decorator(ensure_csrf_cookie, name='get')
# class Trilha1APiView(APIView):
#     def get(self, request):
#         return render(request, "trilha/trilha1.html")


# @method_decorator(ensure_csrf_cookie, name='get')
# class Trilha2APiView(APIView):
#     def get(self, request):
#         return render(request, "trilha/trilha2.html")


# @method_decorator(ensure_csrf_cookie, name='get')
# class Trilha3APiView(APIView):
#     def get(self, request):
#         return render(request, "trilha/trilha3.html")


# @method_decorator(ensure_csrf_cookie, name='get')
# class Trilha4APiView(APIView):
#     def get(self, request):
#         return render(request, "trilha/trilha4.html")

# Modulos 
@method_decorator(ensure_csrf_cookie, name='get')
class ModuloAPiView(APIView):
    def get(self, request):
        return render(request, "trilha/modulo.html")


# Desafios
@method_decorator(ensure_csrf_cookie, name='get')
class Desafio4APiView(APIView):
    def get(self, request):
        return render(request, "desafios/desafio4.html")

@method_decorator(ensure_csrf_cookie, name='get')
class Desafio3APiView(APIView):
    def get(self, request):
        return render(request, "desafios/desafio3.html")


@method_decorator(ensure_csrf_cookie, name='get')
class Desafio2APiView(APIView):
    def get(self, request):
        return render(request, "desafios/desafio2.html")


@method_decorator(ensure_csrf_cookie, name='get')
class Desafio1APiView(APIView):
    def get(self, request):
        return render(request, "desafios/desafio1.html")


# Api que gera o áudio  
method_decorator(ensure_csrf_cookie, name='post')
class GerarAudioAPIView(APIView):
    def post(self, request):
        try:
            # Pega os dados enviados na requisição POST do JavaScrippt que já vem no formato JSON
            data = request.data
            # pega o valor da variável palavra que foi declarada no JavaScrippt
            palavra = data.get('palavra')

            if not palavra:
                return JsonResponse({'erro': 'Palavra não encontrada'}, status=400)

            # caminho com o arquivo original
            # cria o caminho para onde o arquivo de som será enviada
            caminho = os.path.join(settings.MEDIA_ROOT, 'audios', f'{palavra}.mp3')
            os.makedirs(os.path.dirname(caminho), exist_ok=True)

            # utiliza a biblioteca gTTS para transformar texto em fala
            palavraTransformadaEmSom = gTTS(text=palavra, lang='pt')
            palavraTransformadaEmSom.save(caminho)

            # Abrir com o pydub
            som = AudioSegment.from_file(caminho, format="mp3")

            # aumentar o volume do áudio
            audioAmplificado = som + 12

            # sobreescrever o arquivo com o áudio amplificado
            audioAmplificado.export(caminho, format="mp3", codec="libmp3lame")

            som_url = f'{settings.MEDIA_URL}audios/{palavra}.mp3'
            return JsonResponse({'som_url':som_url})
        
        except Exception as e:
            traceback.print_exc()
            return JsonResponse({'erro': str(e)}, status=500)
from django.urls import path
from . import views

urlpatterns = [
    # path("", views.home, name="home"),
    # path('index', views.IndexAPiView.as_view(), name="indexAPiView"),
    path("GerarAudioAPIView/", views.GerarAudioAPIView.as_view(), name="GerarAudioAPIView"),
    path('silabaSimples/', views.VerSilabaSimpleAPIView.as_view(), name="silabaSimpleAPIView"),
    path('silabaComplexa/', views.VerSilabaComplexaAPIView.as_view(), name="silabaComplexaAPIView"),
    path('alfabetoBastao/', views.AlfabetoBastaoAPIView.as_view(), name="alfabetoBastaoAPIView"),
    path('alfabetoImpresso/', views.AlfabetoImpressoAPIView.as_view(), name="alfabetoImpressoAPIView"),
    path('alfabetoCursivo/', views.AlfabetoCursivoAPIView.as_view(), name="alfabetoCursivoAPIView"),
    path('familiaSilabica/', views.FamiliaSilabicaAPIView.as_view(), name ="familiaSilabicaAPIView"),
    path('vogal/', views.VogalAPIView.as_view(), name ="vogalAPIView"),
    path('reescrevaPalavraFase1/', views.ReescrevaPalavraFase1APIView.as_view(), name="reescrevaPalavraFase1APIView"),
    path('reescrevaPalavraFase2/', views.ReescrevaPalavraFase2APIView.as_view(), name="reescrevaPalavraFase2APIView"),
    path('relacaoLetraFigura/', views.RelacaoLetraFiguraAPIView.as_view(), name="relacaoLetraFiguraApiView"),
    path('modulo/', views.ModuloAPiView.as_view(), name="moduloAPiView"),
    # não precisa passar a rota para acessar a página inicial
    path('', views.IndexAPiView.as_view(), name="indexAPiView"),
    # path('trilha2/', views.Trilha2APiView.as_view(), name="trilha2PiView"),
    # path('trilha3/', views.Trilha3APiView.as_view(), name="trilha3APiView"),
    # path('trilha4/', views.Trilha4APiView.as_view(), name="trilha4APiView"),
    path('desafio4/', views.Desafio4APiView.as_view(), name="desafio4"),
    path('desafio3/', views.Desafio3APiView.as_view(), name="desafio3"),
    path('desafio2/', views.Desafio2APiView.as_view(), name="desafio2"),
    path('desafio1/', views.Desafio1APiView.as_view(), name="desafio1"),
]
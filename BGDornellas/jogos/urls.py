from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JogoViewSet

router = DefaultRouter()
router.register(r'jogos', JogoViewSet, basename='jogo')

urlpatterns = [
    path('', include(router.urls)),
]

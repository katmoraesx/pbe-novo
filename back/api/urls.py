from django.urls import path
from .views import *

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # Professores
    path('prof', ProfessoresView.as_view()),
    path('prof/id/<int:pk>', ProfessoresDetailView.as_view()),
    path('buscar/nome/', buscar_nome_professor),
    path('search/', ProfessoresSearchView.as_view()),

    # Disciplinas
    path('disciplinas/', DisciplinasView.as_view()),
    path('disciplinas/id/<int:pk>', DisciplinasDetailView.as_view()),

    # Turmas
    path('turmas/', TurmaView.as_view()),
    path('turmass/id/<int:pk>', TurmaDetailView.as_view()),

    # Cursos
    path('cursos/', CursoView.as_view()),
    path('cursos/id/<int:pk>', CursoDetailView.as_view()),

    # Ambientes
    path('ambientes/', AmbienteView.as_view()),
    path('ambientes/id/<int:pk>', AmbienteDetailView.as_view()),

    # Autenticação
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

from django.urls import path
from .views import *


from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('prof', ProfessoresView.as_view()),
    path('prof/id/<int:pk>', ProfessoresDetailView.as_view()),
    path('disc/id/<int:pk>', DisciplinasDetailView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('buscar/nome/', buscar_nome_professor),
    path('search/', ProfessoresSearchView.as_view()),
    path('disciplinas/', DisciplinasView.as_view()),
    path('disciplinas/id/<int:pk>', DisciplinasDetailView.as_view()),

]


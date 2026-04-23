from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import CustomTokenObtainPairView, ChangePasswordView, AgentListCreateView, AgentDetailView

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('users/', AgentListCreateView.as_view(), name='agent_list_create'),
    path('users/<int:pk>/', AgentDetailView.as_view(), name='agent_detail'),
]

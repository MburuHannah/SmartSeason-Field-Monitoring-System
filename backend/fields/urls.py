from django.urls import path
from .views import FieldListCreateView, FieldDetailView, FieldUpdateListCreateView

urlpatterns = [
    path('', FieldListCreateView.as_view(), name='field_list_create'),
    path('<int:pk>/', FieldDetailView.as_view(), name='field_detail'),
    path('<int:field_id>/updates/', FieldUpdateListCreateView.as_view(), name='field_updates'),
]

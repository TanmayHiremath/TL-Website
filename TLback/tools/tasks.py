from background_task import background
from .models import Flag, Item


@background(schedule=60)
def delet_this(item_id):
    item= Item.objects.get(pk=item_id)
    item.is_flagged=False


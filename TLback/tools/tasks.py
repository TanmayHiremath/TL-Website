from background_task import background
from .models import Flag, Item

@background(schedule=60)
def delet_this(flag_id):
    flag= Flag.objects.get(pk=flag_id)
    flag.item.is_flagged=False


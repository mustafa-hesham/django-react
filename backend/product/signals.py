from django.dispatch import receiver
from django.db.models.signals import post_save
from product.models import Product


@receiver(post_save, sender=Product)
def update_product_quantity(sender, instance, **kwargs):
    variants = instance.variants.all()
    quantity = 0
    for variant in variants:
        quantity += variant.quantity
    Product.objects.filter(pk=instance.id).update(quantity=quantity)

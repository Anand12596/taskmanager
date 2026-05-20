from rest_framework import serializers

from .models import Project

from users.models import User


class ProjectSerializer(serializers.ModelSerializer):

    members_count = serializers.SerializerMethodField()

    member_ids = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        many=True,
        source='members',
        required=False
    )

    class Meta:

        model = Project

        fields = [
            'id',
            'title',
            'description',
            'created_by',
            'members',
            'member_ids',
            'members_count',
        ]

        read_only_fields = [
            'created_by',
            'members',
        ]

    def get_members_count(self, obj):

        return obj.members.count()
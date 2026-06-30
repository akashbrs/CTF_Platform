from CTFd import create_app
from CTFd.models import Configs, Challenges, Users
from CTFd.utils import get_config

app = create_app()
with app.app_context():
    print("User Mode:", get_config('user_mode'))
    print("Challenge Visibility:", get_config('challenge_visibility'))
    print("Start Time:", get_config('start'))
    print("End Time:", get_config('end'))
    challs = Challenges.query.all()
    print("Challenges Total:", len(challs))
    for c in challs:
        print(f" - {c.name} : State={c.state}")

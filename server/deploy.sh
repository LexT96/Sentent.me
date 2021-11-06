ssh -i "pystonks.pem" ubuntu@ec2-35-158-68-212.eu-central-1.compute.amazonaws.com "cd pyStonks/server && git reset --hard && git pull origin main && pipenv install --deploy --ignore-pipfile"

# git add .
# git commit -m "Deploying"
# git push origin main

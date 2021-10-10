pipenv lock
# git add .
# git commit -m "Deploying"
# git push origin main
ssh -i "pystonks.pem" ubuntu@ec2-18-194-112-217.eu-central-1.compute.amazonaws.com cd pyStonks && git pull origin main && pipenv install --deploy --ignore-pipfile

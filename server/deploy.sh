ssh -i "pystonks.pem" ubuntu@ec2-18-194-112-217.eu-central-1.compute.amazonaws.com "cd pyStonks/server && git pull origin main && pipenv install --deploy --ignore-pipfile"

# git add .
# git commit -m "Deploying"
# git push origin main

ssh -i "pystonks.pem" ubuntu@ec2-3-66-231-0.eu-central-1.compute.amazonaws.com "cd pyStonks && sudo rm -r client && cd ../server && git reset --hard && git pull origin main && pipenv install --deploy --ignore-pipfile"

# git add .
# git commit -m "Deploying"
# git push origin main

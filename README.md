# Nåidd
Nåidd is a domestic server project. Currently a work in progress, it is envisioned as base for a home-based server running limitted functions from web-hosting to personal projects. The ultimate goal is to be able to run such a simple deployment in any old hardware that one might have at home, as long as it can run Linux and have basic capabilities.

For routing, the basic philosophy of Nåidd is to route everything through a duckdns domain; which can then be masked by whatever domains are to be actually used afterwards. This allows for full flexibility regarding domain usage, migrations, and etc; while keeping also an static dns configuration available for the functionalities that may need that.


## Setting up the repo
This build requires python 3.10 and docker version 27.2.

1. **Set dependencies and venv**
    
    On Linux/WSL use:
    
        python -m venv venv
    
        source venv/bin/activate
    
        pip install -r requirements.txt


2. **Manage secrets and certificates**

    Add .env file to the root directory.

    Create the proper SSL certificates to start deploying: on Linux/WSL, use (and do so for every domain used):

        docker run -it --rm \
            -v "$PWD/certbot/conf:/etc/letsencrypt" \
            -v "$PWD/certbot/www:/var/www/certbot" \
            -p 80:80 \
            certbot/certbot certonly --standalone \
            --email your@email.com --agree-tos --no-eff-email \
            -d domain.duckdns.org

3. **Set up dependant repositories** (or remove references to them)

    This applies to a set of repositories and apps that are designed to run within the Nåidd setup. In this repo, only "website" is included, so the others must be manually included and managed. This is a sub-optimal solution and there are more elegant ways to do this; but for the sake of keeping things small this is the approach for now.


    Concretely, this step applies to the following repository: depesapp (see https://github.com/aurruti/despesapp ) .

    For each of the subrepositories just clone it in a folder named as the repository.

    Alternatively, if they are not to be used, remove the references to those repositories from: nginx/conf.d/default.conf, docker-compose.yml, and optionally the corresponding update script in the scripts folder.  


4. **Build the setup**

    On Linux/WSL use:

        ./scripts/naidd-update.sh

5. **Set-up periodic updates** (optional)

    Set up a crontab job that periodically runs ./scripts/naidd-update.sh so that everything is kept up to date. Do so as well for any other scripts to keep other repo-related stuff updated.



## Acknowledgements
The name Nåidd is the word in Skolt Sámi to refer to traditional "shamans" in Sámi religion. I have chosen this name as a way to recognize and honour the Sámi community and specially its language/s, currently endagered, facing a battle against extintion. I have been, however, unable to engage with the Sámi community as much as I wished. If you are part of the community and feel this is a cultural appropiation, and/or in any way disrespectful or out of place, please do contact me.

The code included herein can contain some Copilot-generated lines of code in the instances where the use made sense and generated useful results; always with suprevision and testing.

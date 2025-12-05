# Deployment steps

## For Polytech
### Mirroring github repostitory to gitlab (SSH)
[source](https://gemini.google.com/app/2a229f2c879c5d00)
1. Generate an ssh key `gitlab-key` . Give the public key to the gitlab user profile. Then, go to the github repostitory
2. Create 2 repostitory secrets in `<Repository>/Settings/Secrets And Variables/Actions`
	- `GITLAB_SSH_REPO_URL` , value = `<ssh-cloning-key>`
	- `GITLAB_SSH_PRIVATE_KEY` , value = `<private gitlab-key>`
3. Go on github on the `<Repostiory>/Actions/New Workflow` , and `set up a workflow yourself` , and use the following xml template:

```
name: Mirror to GitLab (SSH)
on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  mirror_to_gitlab:
    runs-on: ubuntu-latest
    steps:
      # Step 1: Checkout the source repository
      - name: Checkout Source Repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      # Step 2: Set up SSH agent with the private key
      - name: Set up SSH
        uses: webfactory/ssh-agent@v0.9.0
        with:
          ssh-private-key: ${{ secrets.GITLAB_SSH_PRIVATE_KEY }}
          
      # Step 3: Add the host key to known_hosts to avoid security prompts
      # This step is often necessary for custom hosts like your Polytech instance
      - name: Add SSH known host
        run: ssh-keyscan gitlab.polytech.umontpellier.fr >> ~/.ssh/known_hosts

      # Step 4: Push the mirror to the GitLab destination using SSH URL
      - name: Push to GitLab mirror
        run: |
          # Use the SSH URL stored in the secret
          GITLAB_URL="${{ secrets.GITLAB_SSH_REPO_URL }}"
          
          # Push all local branches
          git push --all $GITLAB_URL
          
          # Push all local tags
          git push --tags $GITLAB_URL
```



### Setting up a CI/CD pipeline on gitlab to a VM on Polytech Servers

## For home server

1. use ssh keys to grant you access to the server use `ssh-keygen` with no passphrase, copy the `.pub` file obtained (**and not the private key**).
2. If server is managed by administrator:
	- ask him to add you ssh key to the `authorized_keys` file
	- otherwise, if you know credentials of an user of the server, connect to it using `scp ./your_public_key.pub user@remoteAddress:~` . This will copy your private key, after that **add** it to the `authorized_keys`: `ssh user@remoteAddress 'cat ~/your_public_key.pub >> .ssh/authorized_keys'`. You should now be able to connect without a password only with `ssh user@remoteAddress`
3. you can now use all of the ssh commands ! enjoy this [cheat sheet](https://www.stationx.net/ssh-commands-cheat-sheet/)
> Note: careful when using IPs: they are prone to change, and often only work if the 2 devices are over the same network. Look up how to create static IPs online, or even better use domain names to mask your IP.

## Deploying a server as a docker

need to dev with routes that will be generic between back and front: no hard coded route like localhost, use generic base url to connect both. 



https://devcenter.heroku.com/articles/local-development-with-docker-compose


https://www.heroku.com/developers/

fly io

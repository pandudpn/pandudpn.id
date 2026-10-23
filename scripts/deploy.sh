#!/bin/sh
# Builds the site and ships it to the VM. There, the pandudpn-id container runs `node build`
# from ./site (mounted read-only at /app) behind the Cloudflare tunnel. The previous build stays
# in site/previous: if the new one doesn't answer, the script puts the previous one back itself;
# going back later by hand is a rename and a restart (see README).
set -eu

host=${DEPLOY_HOST:-pandu}
dir=${DEPLOY_DIR:-/home/pandu/pandudpn.id}/site
name=${DEPLOY_CONTAINER:-pandudpn-id}

cd "$(dirname "$0")/.."

# Restarting a container that doesn't run the uploaded build (such as the old site's image, kept on
# the VM for a while) would look like a success, so refuse unless it runs node from docker-compose.yml.
image=$(ssh "$host" "sudo docker inspect -f '{{.Config.Image}}' $name")
case "$image" in
  node:*) ;;
  *)
    echo "$name runs $image, not node. See \"Setting up the VM from scratch\" in README." >&2
    exit 1
    ;;
esac

npm run check
npm run build

rsync -az --delete build/ "$host:$dir/next/"
rsync -az package.json "$host:$dir/package.json"

ssh "$host" "set -e
cd '$dir'
rm -rf previous
if [ -d build ]; then mv build previous; fi
mv next build
sudo docker restart $name >/dev/null
for i in \$(seq 1 30); do
  if sudo docker exec $name wget -q -O /dev/null http://127.0.0.1:3000/ 2>/dev/null; then exit 0; fi
  sleep 1
done
echo 'The new build did not answer on port 3000 within 30 seconds.' >&2
if [ -d previous ]; then
  rm -rf broken
  mv build broken
  mv previous build
  sudo docker restart $name >/dev/null
  echo 'Put the previous build back; the failed one is in site/broken.' >&2
fi
exit 1"

echo "Deployed: https://pandudpn.id/"

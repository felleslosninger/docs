#!/bin/bash
# Starter (eller restarter) Jekyll-serveren for lokal forhåndsvisning.
# Bruk: bash .agent/restart-jekyll.sh
#
# Forutsetninger (installer én gang hvis ikke allerede gjort):
#   1. Installer Homebrew: https://brew.sh
#        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
#   2. Installer Ruby 3.3:
#        brew install ruby@3.3
#   3. Installer Jekyll og nødvendige gems:
#        export PATH="/opt/homebrew/opt/ruby@3.3/bin:/opt/homebrew/lib/ruby/gems/3.3.0/bin:$PATH"
#        gem install jekyll jekyll-redirect-from --no-document

export PATH="/opt/homebrew/opt/ruby@3.3/bin:/opt/homebrew/lib/ruby/gems/3.3.0/bin:$PATH"

pkill -f "jekyll serve" 2>/dev/null
sleep 1

cd "$(dirname "$0")/.." || exit 1
jekyll serve --detach

echo ""
echo "Åpne http://127.0.0.1:4000 i nettleseren."

fx_version 'cerulean'
game 'gta5'
 
lua54 'yes' -- Add in case you want to use lua 5.4 (https://www.lua.org/manual/5.4/manual.html)
 
client_scripts {
    "config.lua",
    'client.lua', -- Globbing method for multiple files
    "apps/**/client.lua",
    "groups_cl.lua",
}
 
server_scripts {
    "config.lua",
    "@oxmysql/lib/MySQL.lua",
    'server/**/*', -- Globbing method for multiple files
    "apps/**/server.lua",
    "groups_sv.lua",
}

ui_page 'web/build/index.html'
 
files {
    'web/build/index.html',
    'web/build/**/*',
    'web/public/apps/*.png',
    'web/public/bacgrounds/*.png',
    'web/public/rings/*.ogg',
    'web/public/cellcall.ogg',
}

 
shared_scripts {
    'handler.lua'
}


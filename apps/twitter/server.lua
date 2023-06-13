local QBCore = exports['qb-core']:GetCoreObject()
local tweets = {}

Phone.RegisterEvent("nPhone:sendTweet", function(src, data)
    local phone = getPhoneFromId(src)

    table.insert(tweets, {
        id = #tweets + 1,
        fullname = phone.name,
        content = data.content,
        likes = {src = {}, likes = 0},
        gif = data.gif,
        url = data.photo,
        date = os.time(),
        photo = phone.settings.photo,
        comments = {},
        src = src
    })

    local tww = {}
    for i = 1, 15, 1 do
        table.insert(tww, tweets[i])
    end

    table.sort(tww, function(a,b) return tonumber(a.date) > tonumber(b.date) end)

    TriggerClientEvent("setTweet", -1, tww)
    TriggerClientEvent("nPhone:client-notify", -1, "twitter", "New Tweet", "@".. phone.name .. ": " .. data.content, nil)
    return tww
end)

Phone.RegisterEvent("nPhone:changeLike", function(src, data)
    local phone = getPhoneFromId(src)

    if not phone then return end

    if tweets[data.id].likes.src[phone.citizenid] then
        tweets[data.id].likes.src[phone.citizenid] = false
        tweets[data.id].likes.likes = tweets[data.id].likes.likes - 1
    else
        tweets[data.id].likes.src[phone.citizenid] = true
        tweets[data.id].likes.likes = tweets[data.id].likes.likes + 1
        TriggerClientEvent("nPhone:client-notify", src, "twitter", "Twitter", "Post liked!", nil)
        TriggerClientEvent("nPhone:client-notify",  tweets[data.id].src, "twitter", "Twitter", ("%s tweetinize beğendi!"):format(phone.name), nil)
    end

    local tww = {}
    for i = 1, 15, 1 do
        table.insert(tww, tweets[i])
    end

    table.sort(tww, function(a,b) return tonumber(a.date) > tonumber(b.date) end)
    print(json.encode(tww, {indent= true}))
    TriggerClientEvent("setTweet", -1, tww)
end)

Phone.RegisterEvent("nPhone:getTweetById", function(source, id)
    return tweets[id]
end)

Phone.RegisterEvent("nPhone:sendComment", function(source, data)
    local phone = getPhoneFromId(source)
    if not phone then return end


    for key, v in pairs(tweets) do
        if v.id == data.id then
            table.insert(tweets[data.id].comments, {
                fullname = phone.name,
                content = data.comment,
                url = data.url or "",
                date = os.time(),
                photo = phone.settings.photo,
                likes = {src = {}, likes = 0}
            }) 
        
            TriggerClientEvent("updateComments", -1, tweets[data.id])

            TriggerClientEvent("nPhone:client-notify", tweets[data.id].src, "twitter", "Twitter", ("Tweetinize %s yorum yaptı!"):format(phone.name), nil)


            local tww = {}
            for i = 1, 15, 1 do
                table.insert(tww, tweets[i])
            end
        
            table.sort(tww, function(a,b) return tonumber(a.date) > tonumber(b.date) end)

            TriggerClientEvent("setTweet", -1, tww)
        end
    end


    return tweets[data.id]
end)

Phone.RegisterEvent("nPhone:currentTweets", function(src)
    local tww = {}
    for i = 1, 15, 1 do
        table.insert(tww, tweets[i])
    end

    table.sort(tww, function(a,b) return tonumber(a.date) > tonumber(b.date) end)

    return tww
end)

Phone.RegisterEvent("nPhone:getPhoto", function(src)
    local phone = getPhoneFromId(src)

    return phone.settings.photo
end)

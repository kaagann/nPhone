local QBCore = exports['qb-core']:GetCoreObject()

RegisterNetEvent('QBCore:Client:OnPlayerLoaded', function()
    local data = Phone.TriggerServerEvent("nPhone:currentTweets")

end)

RegisterNUICallback("sendTweet", function(data, cb)
    print(json.encode(data))
    Phone.TriggerServerEvent("nPhone:sendTweet", data)
end)

RegisterNUICallback("sendComment", function(data, cb)
    Phone.TriggerServerEvent("nPhone:sendComment", data)
end)

RegisterNUICallback("getTweets", function(data, cb)
    local tweets = Phone.TriggerServerEvent("nPhone:currentTweets")

    cb(tweets)
end)

RegisterNUICallback("getTweetById", function(data, cb)
    local twt = Phone.TriggerServerEvent("nPhone:getTweetById",data)

    cb(twt)
end)

RegisterNUICallback("getPhoto", function(data, cb)
    local photo = Phone.TriggerServerEvent("nPhone:getPhoto")

    cb(photo)
end)

RegisterNUICallback("changeLike", function(data, cb)
    Phone.TriggerServerEvent("nPhone:changeLike", data)
end)

RegisterNetEvent('setTweet', function(data)
    SendReactMessage("setTweet", data)
end)

RegisterNetEvent('updateComments', function(data)
    SendReactMessage("updateComments", data)
end)
local QBCore = exports['qb-core']:GetCoreObject()

RegisterNetEvent('QBCore:Client:OnPlayerLoaded', function()
    local data = Phone.TriggerServerEvent("nPhone:currentAds")

    Phone.TriggerServerEvent("nPhone:sendAds", data)
end)

RegisterNUICallback("sendAds", function(data, cb)
    Phone.TriggerServerEvent("nPhone:sendAds", data)
end)

RegisterNUICallback("getAds", function(data, cb)
    local ads = Phone.TriggerServerEvent("nPhone:currentAds")

    cb(ads)
end)

RegisterNetEvent('setAds', function(data)
    SendReactMessage("setAds", data)
end)
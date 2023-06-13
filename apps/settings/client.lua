local QBCore = exports['qb-core']:GetCoreObject()

RegisterNUICallback("getSettings", function(data, cb)
    local phone = Phone.TriggerServerEvent("nPhone:getSettings")

    cb(phone)
end)

RegisterNUICallback("updateSettings", function(data, cb)
    Phone.TriggerServerEvent("nPhone:setSettings", data)
end)

RegisterNUICallback("updatePhoto", function(data, cb)
    local settings = Phone.TriggerServerEvent("nPhone:setPhoto", data)

    if settings then
        SendReactMessage("setSettings", settings)
    end
end)
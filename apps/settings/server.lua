local QBCore = exports['qb-core']:GetCoreObject()

Phone.RegisterEvent("nPhone:getSettings", function(src)
    local phone = getPhoneFromId(src)

    local settings = phone.settings
    return settings
end)

Phone.RegisterEvent("nPhone:setSettings", function(src, data)
    local phone = getPhoneFromId(src)

    phone.setSettings(data)
end)

Phone.RegisterEvent("nPhone:setPhoto", function(src, data)
    local phone = getPhoneFromId(src)

    phone.setPhoto(data)

    return phone.settings
end)
local QBCore = exports['qb-core']:GetCoreObject()
local ads = {}

Phone.RegisterEvent("nPhone:sendAds", function(src, data)
    local phone = getPhoneFromId(src)

    table.insert(ads, {
        url = data.url,
        content = data.content,
        category = data.selectedType,
        date = os.time(),
        name = phone.name,
        number = phone.number
    })

    local tww = {}
    for i = 1, 15, 1 do
        table.insert(tww, ads[i])
    end

    table.sort(tww, function(a,b) return tonumber(a.date) > tonumber(b.date) end)

    TriggerClientEvent("setAds", -1, tww)
    return tww

end)

Phone.RegisterEvent("nPhone:currentAds", function(src)
    local tww = {}
    for i = 1, 15, 1 do
        table.insert(tww, ads[i])
    end

    table.sort(tww, function(a,b) return tonumber(a.date) > tonumber(b.date) end)

    return tww
end)
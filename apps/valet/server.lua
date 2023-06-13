local QBCore = exports['qb-core']:GetCoreObject()

Phone.RegisterEvent("nPhone:getVehicles", function(src)
    local phone = getPhoneFromId(src)
    local result = MySQL.query.await('SELECT * FROM player_vehicles WHERE citizenid = ?', { phone.citizenid })

    if result[1] ~= nil then
        return result
    else
        return {}
    end
end)
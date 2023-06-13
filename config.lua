Config = {
    Webhooks = {
        Camera = "https://discord.com/api/webhooks/1024369318399578162/iQvTESl71fa_RCwuhbR0tz7PIq9oK_CKiGRkwfOz_wN4fpiGZLvux5Ma4TfKW25MybTk"
    },

    PhoneModel = "prop_npc_phone",

    Jobs = {
        {
            name = "Mechanic",
            price = 3,
            coords = {x = 0, y = 0, z = 0},
            icon = "FaCarSide"
        },
        {
            name = "Nano",
            price = 5,
            coords = {x = 502, y = 123, z = 0},
            icon = "FaCarSide"
        },

    },

    Functions = {
        AddKey = function(veh)
            TriggerEvent("vehiclekeys:client:SetOwner", QBCore.Functions.GetPlate(veh))
        end,
    },

    Backgrounds = {
        "1.jpg",
        "2.jpg"
    }
}
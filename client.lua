QBCore = exports['qb-core']:GetCoreObject()
phoneData = {}
phoneOpen = false
phoneProp = 0
pullingOut = false


function SendReactMessage(action, data)
    SendNUIMessage({
      action = action,
      data = data
    })
end
exports("SendReactMessage", SendReactMessage)

RegisterNetEvent("nPhone:phoneLoaded", function(pData, _theme)
    phoneData = pData or phoneData

    SendReactMessage("phoneLoad", {
        theme = _theme
    })
end)

RegisterNetEvent('QBCore:Client:OnPlayerLoaded', function()
    TriggerServerEvent("nPhone:load")
end)

AddEventHandler('onResourceStart', function(resourceName)
    if (GetCurrentResourceName() ~= resourceName) then
      return
    end
    print('The resource ' .. resourceName .. ' has been started.')
    TriggerServerEvent("nPhone:load")
end)

RegisterCommand("loadphone", function()
    TriggerServerEvent("nPhone:load")
end)

RegisterNUICallback("inputFocus", function(data, cb)
    if data then
        SetNuiFocusKeepInput(false)
    else
        SetNuiFocusKeepInput(true)
    end
end)

currentFocus = false


function DisableDisplayControlActions()
    DisableControlAction(0, 1, true) -- disable mouse look
    DisableControlAction(0, 2, true) -- disable mouse look
    DisableControlAction(0, 3, true) -- disable mouse look
    DisableControlAction(0, 4, true) -- disable mouse look
    DisableControlAction(0, 5, true) -- disable mouse look
    DisableControlAction(0, 6, true) -- disable mouse look
    DisableControlAction(0, 263, true) -- disable melee
    DisableControlAction(0, 264, true) -- disable melee
    DisableControlAction(0, 257, true) -- disable melee
    DisableControlAction(0, 140, true) -- disable melee
    DisableControlAction(0, 141, true) -- disable melee
    DisableControlAction(0, 142, true) -- disable melee
    DisableControlAction(0, 143, true) -- disable melee
    DisableControlAction(0, 177, true) -- disable escape
    DisableControlAction(0, 200, true) -- disable escape
    DisableControlAction(0, 202, true) -- disable escape
    DisableControlAction(0, 322, true) -- disable escape
    DisableControlAction(0, 245, true) -- disable chat
end

function open(bool)
    local hasPhone = QBCore.Functions.HasItem("phone")

    if not hasPhone then 
        QBCore.Functions.Notify("Telefonun yok!", "error")
        return
    end

    if phoneOpen == false then
        phoneOpen = true
        currentFocus = true
        SendReactMessage("handleOpen", true)
        SetNuiFocus(true, true)
        SetNuiFocusKeepInput(true)
        PhoneAnimation(true)
    else
        SendReactMessage("closePhone", false)
        SetNuiFocus(false, false)
        SetNuiFocusKeepInput(false)
        PhoneAnimation(false)
        Wait(5)
        phoneOpen = false
        currentFocus = false
    end

    

    CreateThread(function()
        while phoneOpen do
            DisableDisplayControlActions()
            Wait(1)
        end
    end)

end


RegisterCommand("nphone", function()
    open(not phoneOpen)
end)

-- RegisterCommand("numaraver", function()
--     local playerPed = PlayerPedId()
--     local playerCoords = GetEntityCoords(playerPed)
--     local player, distance = QBCore.Functions.GetClosestPlayer(playerCoords)

--     if player ~= -1 and distance < 2.5 then
--         local playerId = GetPlayerServerId(player)
--         TriggerServerEvent("nPhone:giveNumber", playerId)
--     else
--         QBCore.Functions.Notify("Yakınlarda kimse yok!", "error")
--     end
-- end)

RegisterKeyMapping("nphone", "Telefonu Açar", "keyboard", "m")

RegisterNetEvent("setOther", function()
    local settings = Phone.TriggerServerEvent("nPhone:getSettings")

    SendReactMessage("setSettings", settings)
    SendReactMessage("setTheme", settings.mode)
end)

RegisterNUICallback("hideFrame", function()
    open(not phoneOpen)
    PhoneAnimation(false)
end)

function Notify(app, title, text, data)
    -- if IsPlayerDead(PlayerId()) then 
    --     return
    -- end

    local hasPhone = QBCore.Functions.HasItem("phone")

    if not hasPhone then 
        -- QBCore.Functions.Notify("Telefonun yok!", "error")
        return
    end



    SendReactMessage(
        'notify',
        {app = app, title = title, text = text, data = data}
    )
end
RegisterNetEvent("nPhone:client-notify", Notify)



RegisterNUICallback("markLocation", function(data, cb)
    SetNewWaypoint(data.x, data.y)
    Notify("map", "GPS", "Location marked!", nil)
end)

RegisterNUICallback("getBackgrounds", function(data,cb)
    cb(Config.Backgrounds)
end)

function PhoneAnimation(value, calling)
    pullingOut = value
    if pullingOut then 
        LoadAnimDict('cellphone@', function ()
            if calling then 
                TaskPlayAnim(PlayerPedId(), 'cellphone@', 'cellphone_call_listen_base', 3.0, -1, -1, 50, 0, false, false, false)
            else 
                TaskPlayAnim(PlayerPedId(), 'cellphone@', 'cellphone_text_in', 3.0, -1, -1, 50, 0, false, false, false)
            end
            
            Wait(400)
            AddPhone()
        end)
    else 
        StopAnimTask(PlayerPedId(), 'cellphone@', 'cellphone_text_in', 3.0)
        LoadAnimDict('cellphone@', function ()
            TaskPlayAnim(PlayerPedId(), 'cellphone@', 'cellphone_text_out', 3.0, 3.0, 750, 50, 0, false, false, false)
            Wait(400)
            RemovePhone()
        end)
    end
end

function AddPhone()
    RemovePhone()

    local ped = PlayerPedId()

	RequestModel(Config.PhoneModel)
	while not HasModelLoaded(Config.PhoneModel) do
		Citizen.Wait(1)
	end

	phoneProp = CreateObject(Config.PhoneModel, 1.0, 1.0, 1.0, 1, 1, 0)

	local bone = GetPedBoneIndex(ped, 28422)
	local isUnarmed = GetCurrentPedWeapon(ped, "WEAPON_UNARMED")

	if not isUnarmed then
		AttachEntityToEntity(phoneProp, ped, bone, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1, 1, 0, 0, 2, 1)
	else
		SetCurrentPedWeapon(ped, "WEAPON_UNARMED", true)
		AttachEntityToEntity(phoneProp, ped, bone, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1, 1, 0, 0, 2, 1)
	end
end

function RemovePhone()
    local x,y,z = table.unpack(GetEntityCoords(PlayerPedId()))
    local closeObj = GetClosestObjectOfType(x, y, z, 1.0, GetHashKey(Config.PhoneModel), false)
    SetEntityAsMissionEntity(closeObj)
    DeleteObject(closeObj)

	if phoneProp ~= nil then
        DeleteObject(phoneProp)
		phoneProp = nil	
    end
end

function LoadAnimDict(dict, cb)
    RequestAnimDict(dict)
    while not HasAnimDictLoaded(dict) do 
        Wait(1)
    end
    cb()
end
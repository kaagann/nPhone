calling = nil
RegisterNUICallback("addContact", function(data, cb)
    local contacts = Phone.TriggerServerEvent("nPhone:addContact", data)
    print("geldin")
    if contacts then
        cb(contacts)
    else
        cb({})
    end
end)

RegisterNUICallback('getContacts', function (data, cb)
    local contacts = Phone.TriggerServerEvent('nPhone:getContacts')

    if contacts then 
        cb(contacts)
    else 
        cb({})
    end
end)

RegisterNUICallback("attemptCall", function(data, cb)
    print(data)
    if not calling then
        calling = number
        print("arama yapılıyor")
        local bool = Phone.TriggerServerEvent("nPhone:attemptCall", data)

        PhoneAnimation(true, true)

        if bool then
            calling = nil
            return
        end

        
    end
end)

RegisterNUICallback('answerCall', function (data, cb)
    if calling then
        Phone.TriggerServerEvent("nPhone:declineCall", calling)
    end

    calling = data.number
    Phone.TriggerServerEvent('nPhone:answerCall', data.number)
end)

RegisterNUICallback('declineCall', function (data, cb)
    calling = nil
    Phone.TriggerServerEvent('nPhone:declineCall', data.number)
end)

RegisterNetEvent('nPhone:answerCall', function (number)
    calling = number

    PhoneAnimation(true, true)
    exports["pma-voice"]:addPlayerToCall(number)
    print("cevap alındı")
    SendReactMessage("answerCall")
end)

CreateThread(function()
    while true do
        Wait(500)
        local ped = PlayerPedId()
        if not IsEntityPlayingAnim(ped, 'cellphone@', 'cellphone_call_listen_base', 3) and calling ~= nil then
            LoadAnimDict('cellphone@', function ()
                TaskPlayAnim(ped, 'cellphone@', 'cellphone_call_listen_base', 3.0, 3.0, -1, 50, 0, false, false, false)
            end)
        end
    end
end)

RegisterNUICallback("removeContact", function(data, cb)
    local contacts = Phone.TriggerServerEvent("nPhone:client:removeContact", data)

    SendReactMessage("setContacts", contacts)
end)

RegisterNetEvent('nPhone:declineCall', function ()
    calling = nil

    PhoneAnimation(false, false)

    exports["pma-voice"]:removePlayerFromCall()
    SendReactMessage("declineCall")

end)

RegisterNUICallback("getCallHistory", function(data, cb)
    local history = Phone.TriggerServerEvent('nPhone:getCallHistory')

    if history then
        cb(history)
    else
        cb({})
    end

end)

RegisterNetEvent("nPhone:client-updateCallHistory", function(history)
    SendReactMessage("setCallHistory", history)
end)


RegisterNUICallback("setContactFavori", function(data, cb)
    local contacts = Phone.TriggerServerEvent("nPhone:client:setContactFavori", data)
    if contacts then
        cb(contacts)
    else
        cb({})
    end
end)

RegisterNUICallback("setContactFast", function(data, cb)
    local contacts = Phone.TriggerServerEvent("nPhone:client:setContactFast", data.number, data.bool)
    if contacts then
        cb(contacts)
    else
        cb({})
    end
end)

-- nPhone:client:setContactFast

RegisterNUICallback("changePP", function(data, cb)
    local photo = Phone.TriggerServerEvent('nPhone:client:changePP', data)


    SendReactMessage("setContacts", photo.contacts)
    cb(photo.contact)
end)


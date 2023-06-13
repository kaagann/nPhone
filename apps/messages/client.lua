function getStreetandZone(coords)
	local zone = GetLabelText(GetNameOfZone(coords.x, coords.y, coords.z))
	local currentStreetHash = GetStreetNameAtCoord(coords.x, coords.y, coords.z)
	currentStreetName = GetStreetNameFromHashKey(currentStreetHash)
	playerStreetsLocation = currentStreetName .. ", " .. zone
	return playerStreetsLocation
end



RegisterNUICallback("getMessages", function(data, cb)
    local messages = Phone.TriggerServerEvent("nPhone:getMessages")

    if messages then
        cb(messages)
    else
        cb({})
    end
end)

RegisterNUICallback("getChat", function(data, cb)
    local messages = Phone.TriggerServerEvent("nPhone:getChat", tonumber(data))
    if messages then
        cb(messages)
    else
        cb({})
    end

    local username = Phone.TriggerServerEvent("nPhone:getUsername", tonumber(data))
    print(username, "kadı")
    if username then
        SendReactMessage("setChatUsername", username)
    end
end)

RegisterNUICallback("sendMessage", function(data,cb)

    if data.coords then
        local coords = GetEntityCoords(PlayerPedId())
        data.msg = getStreetandZone(coords)
        data.coords = coords
    end


    local messages = Phone.TriggerServerEvent('nPhone:sendMessage', data.msg, tonumber(data.number), data.coords, data.image)
    

    if messages then 
        cb(messages)
    else 
        cb({})
    end

end)

RegisterNetEvent("nPhone:client-updateMessages", function(messages)
    SendReactMessage("setMessages", messages)
end)

RegisterNetEvent("nPhone:client-updateChat", function(number, messages)
    SendReactMessage("setChat", {
        chat = messages,
        number = number
    })
end)
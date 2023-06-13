Phone.RegisterEvent("nPhone:addContact", function(src, data)
    local phone = getPhoneFromId(src)
    local contacts = phone.getContacts()

    -- if phone.number == data.number then 
    --     return contacts
    -- end

    phone.addContact(data)

    contacts = phone.getContacts()
    return contacts
end)

Phone.RegisterEvent("nPhone:getContacts", function(src)
    local phone = getPhoneFromId(src)
    if not phone then return print("telefon bulaamadı get contacts") end


    local contacts = phone.getContacts()
    return contacts
end)

Phone.RegisterEvent("nPhone:getCallHistory", function(src)
    local phone = getPhoneFromId(src)
    if not phone then print("telefon bulaamadı get contacts") end
    local history = phone.getCallHistory()
    local data = {}

    for k, v in pairs(history) do
        table.insert(data, {
            number = v.number,
            date = v.date,
            name = IsNumberInContacts(phone.getContacts(), v.number),
            type = v.type
        })
    end

    return data
end)

Phone.RegisterEvent("nPhone:attemptCall", function(source, number)
    local phone = getPhoneFromId(source)
    print(number)
    local target = getPlayerByPhone(tonumber(number))

    if phone.number == number then
        return true
    end
    
    TriggerClientEvent("nPhone:client-notify", phone.source, "phone", IsNumberInContacts(phone.getContacts(), number), "Calling", {
        caller = true, 
        number = number
    })

    phone.addCallHistory({
        number = number,
        date = os.time(),
        type = "Outgoing call"
    })

    if target then
        print("target bulundu be yarak")

        local history = target.getCallHistory()
        table.insert(history, {
            number = phone.number,
            date = os.time(),
            type = "Incoming call"
        })

    
        target.setCallHistory(history)

        TriggerClientEvent("nPhone:client-notify", target.source, "phone", IsNumberInContacts(target.getContacts(), phone.number), "Calling", {
            caller = false, 
            number = phone.number
        })

    end

end)

Phone.RegisterEvent('nPhone:answerCall', function (source, number)
    local phone = getPhoneFromId(source)
    local target = getPlayerByPhone(tonumber(number))



    TriggerClientEvent('nPhone:answerCall', source, number)
    TriggerClientEvent('nPhone:answerCall', target.source, number)
end)

Phone.RegisterEvent('nPhone:declineCall', function (source, number)
    local phone = getPhoneFromId(source)
    local target =  getPlayerByPhone(tonumber(number))

    TriggerClientEvent('nPhone:declineCall', source)

    if target then 
        TriggerClientEvent('nPhone:declineCall', target.source)
    end
end)

Phone.RegisterEvent("nPhone:client:setContactFavori", function(source, number)
    local phone = getPhoneFromId(source)
    if not phone then return end

    return phone.setFavorite(number)
end)

Phone.RegisterEvent("nPhone:client:setContactFast", function(source, number, bool)
    local phone = getPhoneFromId(source)
    if not phone then return end

    return phone.setFast(number, bool)
end)

Phone.RegisterEvent("nPhone:client:removeContact", function(src, data)
    local phone = getPhoneFromId(src)
    if not phone then return end

    phone.removeContact(data)

    return phone.getContacts()
end)

Phone.RegisterEvent("nPhone:client:changePP", function(src, data)
    local phone = getPhoneFromId(src)
    if not phone then return end

    return {contact = phone.setContactsPhoto(data), contacts = phone.getContacts()}
end)
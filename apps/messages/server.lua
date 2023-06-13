Phone.RegisterEvent('nPhone:getMessages', function (src)
    local phone = getPhoneFromId(src)
    return FormatMessages(phone)
end)

Phone.RegisterEvent('nPhone:getChat', function (src, number)
    local phone = getPhoneFromId(src)
    local messages = phone.getMessages()
    return messages[tostring(number)]
end)



Phone.RegisterEvent("nPhone:getUsername", function(src, number)
    local phone = getPhoneFromId(src)
    local contacts = phone.getContacts()
    
    return IsNumberInContacts(contacts, number)
end)


function FormatMessages(phone)
    if not phone then return end

    local messages = phone.getMessages()
    local contacts = phone.getContacts()

    local msgs = {}

    for k,v in pairs(messages) do 
        table.insert(msgs, {
            msg = v[#v].msg,
            name = IsNumberInContacts(contacts, k),
            number = k,
            date = v[#v].date,
            photo = IsNumberHasPhoto(contacts, k)
        })
    end

    table.sort(msgs, function(a,b) return tonumber(a.date) > tonumber(b.date) end)

    local formated = {}
    for i = 1, 10 do
        table.insert(formated, msgs[i])
    end

    return formated
end

Phone.RegisterEvent('nPhone:sendMessage', function (src, msg, number, coords, image)
    local phone = getPhoneFromId(src)
    local target = getPlayerByPhone(tonumber(number))
    number = tostring(number)
    phone.addMessage(number, msg, coords, image)
    print("image", image)

    if target then
        local messages = target.getMessages()
        local contacts = target.getContacts()

        if messages[phone.number] then
            table.insert(messages[phone.number], {
                number = phone.number,
                msg = msg,
                date = os.time(),
                coords = coords,
                image = image
            })
        else
            messages[phone.number] = {{
                number = phone.number,
                msg = msg,
                date = os.time(),
                coords = coords,
                image = image
            }}
        end

        target.setMessages(messages)
        TriggerClientEvent('nPhone:client-updateChat', target.source, phone.number, messages[tostring(phone.number)])
        TriggerClientEvent("nPhone:client-notify", target.source, "messages", IsNumberInContacts(contacts, phone.number),  msg, {number = phone.number})
        TriggerClientEvent("nPhone:client-updateMessages", target.source, FormatMessages(target))
    else
        local result = MySQL.query.await('SELECT * FROM phone WHERE phone_number = ?', { tostring(number) })

        if result[1] then
            local messages = json.decode(result[1].messages)

            if messages then
                if messages[phone.number] then
                    table.insert(messages[phone.number], {
                        number = phone.number,
                        msg = msg,
                        date = os.time(),
                        coords = coords,
                        image = image
                    })
                else
                    messages[phone.number] = {{
                        number = phone.number,
                        msg = msg,
                        date = os.time(),
                        coords = coords,
                        image = image
                    }}
                end
            else
                messages = {}
                messages[phone.number] = {{
                    number = phone.number,
                    msg = msg,
                    date = os.time(),
                    coords = coords,
                    image = image
                }}
            end

            MySQL.query("UPDATE phone SET messages = @messages WHERE phone_number = @phone_number", {
                ["@messages"] = json.encode(messages),
                ["phone_number"] = number
            })

        end

    end 

    TriggerClientEvent("nPhone:client-updateMessages", phone.source, FormatMessages(phone))


    return phone.getMessages()[number]
end)
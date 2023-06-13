function savePhone(phone, callback)
    if not phone.citizenid then return end

    MySQL.Async.execute("INSERT INTO phone (citizenid, phone_number, contacts, messages, gallery, settings) VALUES (:citizenid, :phone_number, :contacts, :messages, :gallery, :settings) ON DUPLICATE KEY UPDATE contacts = :contacts, messages = :messages, gallery = :gallery, settings = :settings", 
    {
        citizenid = phone.citizenid,
        phone_number = phone.number,
        contacts = json.encode(phone.contacts),
        messages = json.encode(phone.messages),
        gallery = json.encode(phone.gallery),
        settings = json.encode(phone.settings)
    }, function ()
        if cb then 
            cb()
        end
    end)
end

function getPhoneFromId(source)
    if not phones then return end
    return phones[tonumber(source)] or nil
end 

function getPlayerByPhone(number)
    for k, v in pairs(phones) do
        if tonumber(v.number) == tonumber(number) then
            return phones[k]
        end
    end

    return nil
end

function IsNumberInContacts(contacts, number)
    local val = number
    for k,v in pairs(contacts) do 
        if tostring(number) == tostring(v.number) then 
            val = v.name .. " " .. v.surname
        end
    end
    return val
end

function IsNumberHasPhoto(contacts, number)
    local val = "https://cdn.discordapp.com/attachments/1029450648011415552/1029451965412941844/unknown.png"
    for k,v in pairs(contacts) do 
        if tostring(number) == tostring(v.number) then 
            val = v.picture
        end
    end
    return val
end






function createPhone(source, contacts, messages, gallery, settings)
    local self = {}
    local player = QBCore.Functions.GetPlayer(source)

    self.source = source
    self.number = player.PlayerData.charinfo.phone
    self.name = player.PlayerData.charinfo.firstname .. " " .. player.PlayerData.charinfo.lastname
    self.citizenid = player.PlayerData.citizenid
    self.player = player
    self.contacts = json.decode(contacts) or {}
    self.messages =  json.decode(messages) or {}
    self.gallery =  json.decode(gallery) or {}
    self.settings = json.decode(settings) or {
        name = self.name,
        number = self.number,
        citizenid = self.citizenid,
        ringColor = "ring-[#D04457]",
        mode = "light",
        bg = "background1",
        photo = "https://kagan.app/images/phone/user.png"
    }

    self.callhistory = {}

    self.getContacts = function()
        return self.contacts
    end

    self.setContactsPhoto = function(data)
        self.contacts[data.id].picture = data.picture

        return self.contacts[data.id]
    end

    self.addContact = function(data)
        local has = false
        for k,v in pairs(self.contacts) do
            if tonumber(v.number) == tonumber(data.number) then
                has = k
            end
        end
        if has then
            self.contacts[has] = data
        else
            table.insert(self.contacts, data)
        end
    end

    self.removeContact = function(data)
        table.remove(self.contacts, data)
    end

    self.addCallHistory = function(data)
        print("adding call history", self.name)
        table.insert(self.callhistory, data)

        local data = {}
        for k, v in pairs(self.callhistory) do
            table.insert(data, {
                number = v.number,
                date = v.date,
                name = IsNumberInContacts(self.contacts, v.number),
                type = v.type
            })
        end

        TriggerClientEvent("nPhone:client-updateCallHistory", self.source, data)
        
    end

    self.getCallHistory = function()
        return self.callhistory
    end

    self.setCallHistory = function(history)
        self.callhistory = history
        local data = {}
        for k, v in pairs(self.callhistory) do
            table.insert(data, {
                number = v.number,
                date = v.date,
                name = IsNumberInContacts(self.contacts, v.number),
                type = v.type
            })
        end

        TriggerClientEvent("nPhone:client-updateCallHistory", self.source, data)
    end



    self.setFavorite = function(number) 
        for k,v in pairs(self.contacts) do
            if tonumber(v.number) == tonumber(number) then
                self.contacts[k].favorite = true
            end
        end

        return self.contacts
    end

    self.setFast = function(number, bool) 
        for k,v in pairs(self.contacts) do
            if tonumber(v.number) == tonumber(number) then
                self.contacts[k].fast = bool
            end
        end

        return self.contacts
    end

    --messages

    self.getMessages = function()
        return self.messages
    end

    self.setMessages = function (messages)
        self.messages = messages
    end

    self.addMessage = function(number, msg, coords, image)
        print("photo", photo)
        if self.messages[number] then 
            table.insert(self.messages[number], {number = self.number, msg = msg, date = os.time(), coords = coords, image = image})
        else 
            self.messages[number] = {{number = self.number, msg = msg, date = os.time(), coords = coords, image = image}}
        end    
    end



    -- notify

    self.notify = function(app, title, text, data)
        TriggerClientEvent("nPhone:client-notify", self.source, app, title, text, data)
    end


    -- gallery

    self.getGallery = function()
        return self.gallery
    end

    self.setGallery = function(photos)
        self.gallery = photos
    end

    -- settings 

    self.setSettings = function(data)
        self.settings = data
    end

    self.setPhoto = function(data)
        self.settings.photo = data
    end
  
    return self
end


QBCore = exports['qb-core']:GetCoreObject()
phones = {}

RegisterNetEvent("nPhone:load", function()
    local src = source
    local player = QBCore.Functions.GetPlayer(src)
    local result = MySQL.query.await('SELECT * FROM phone WHERE citizenid = ?', { player.PlayerData.citizenid })
    
    if result[1] then
        phones[src] = createPhone(src, result[1].contacts, result[1].messages, result[1].gallery, result[1].settings)

        TriggerClientEvent("setOther", src)
        TriggerEvent("nPhone:phoneLoaded", src, phones[src].settings.mode)
    else
        phones[src] = createPhone(src)
        TriggerEvent("nPhone:phoneLoaded", src, phones[src].settings.mode)

    end
end)

-- local QBCore = exports['qb-core']:GetCoreObject()
RegisterNetEvent("vivum-billing:faturaKes", function(data)


    data.id = tonumber(data.id)
    data.payments_num = tonumber(data.payments_num)
    data.payments_period = tonumber(data.payments_period)
    data.amount = tonumber(data.amount)

    if data.id == source then return end

    local sender = QBCore.Functions.GetPlayer(source)
    if not sender then return end

         

    local alici = QBCore.Functions.GetPlayer(data.id)

    if not alici then return end

    
	-- local src = source
	-- print(data.id, reciver)
	-- local reciver = QBCore.Functions.GetPlayer(tonumber(data.id)),
	-- local player = QBCore.Functions.GetPlayer(src)
	-- if not reciver then return end

	local invoiceData = {
		sender = sender.PlayerData.job.name,
		sender_label = 'Ben',
		recipient = alici.PlayerData.citizenid,
		recipient_label = alici.PlayerData.charinfo.firstname .. " " .. alici.PlayerData.charinfo.lastname,
		amount = data.amount,
		payments_num = data.payments_num,
		payments_period = data.payments_period, -- (in days)
		summary = data.summary
	}

    print(json.encode(invoiceData))

	exports["vivum-billing"]:SendInvoice(source, invoiceData, function(res)
		print(res)
	end)
end)

-- RegisterNetEvent("nPhone:giveNumber", function(toSrc)
--     local player = QBCore.Functions.GetPlayer(source)
--     local toPlayer = QBCore.Functions.GetPlayer(toSrc)

--     if player and toPlayer then
--         local toPhone = getPhoneFromId(toPlayer.PlayerData.source)
--         local phone = getPhoneFromId(player.PlayerData.source)

--         -- toPhone.addContact()
--         local data = {
--             picture:  phone.settings.photo,
--             name: player.PlayerData.charinfo.firstname,
--             surname: player.PlayerData.charinfo.lastname,
--             number: player.PlayerData.charinfo.phone,
--             iban: player.PlayerData.charinfo.account,
--             job: Player.PlayerData.job.grade.name,
--             favorite: false,
--             not: '',
--             fast: false
--         }
--         print(json.encode(data, {indent = true}))
--         toPhone.notify("contacts", "Rehber", "Rehberinize yeni bir kişi kayıt edildi")

--     end
-- end)



exports("getPhoneImage", function(citizenid, callback) 
    local player = QBCore.Functions.GetPlayerByCitizenId(citizenid)
    local p = promise.new()
    local photo = ""

    if player then
        local phone = getPhoneFromId(player.PlayerData.source)

        if phone then
            if callback then
                callback(phone.settings.photo)
                return
            else
                p:resolve(phone.settings.photo)
            end
        end
    else
        local result = MySQL.query.await('SELECT settings FROM phone WHERE citizenid = ?', { citizenid })
        if result[1] then
            print(json.encode(result[1]))
            data = json.decode(result[1].settings)
            if callback then 
                callback(data.photo)
                return
            else
                p:resolve(data.photo)
            end
        else
            if callback then
                callback("https://kagan.app/images/phone/user.png")
            else
                p:resolve("https://kagan.app/images/phone/user.png")
            end 
        end
    end

    return Citizen.Await(p)
end)
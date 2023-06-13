local QBCore = exports['qb-core']:GetCoreObject()

Phone.RegisterEvent("nPhone:getBankDetails", function(src)
    local Player = QBCore.Functions.GetPlayer(src)
    local bills = {}
    local p = promise.new()
    local result = MySQL.query.await('SELECT * FROM phone_invoices WHERE citizenid = ?', {Player.PlayerData.citizenid})
    
    if result[1] ~= nil then
        bills = result
    else
        bills = nil
    end

    
    p:resolve(exports["nBanking"]:getPlayerHistory(Player.PlayerData.citizenid))

    history = Citizen.Await(p)

    
    return {
        balance = Player.PlayerData.money["bank"],
        iban = Player.PlayerData.charinfo.account,
        history = history,
        bills = bills
    }
end)

Phone.RegisterEvent("nPhone:sendTransfer", function(src, data)
    local Player = QBCore.Functions.GetPlayer(src)
    local srcPhone = getPhoneFromId(src)
    local query = '%' .. data.number .. '%'
    local result = MySQL.query.await('SELECT * FROM players WHERE charinfo LIKE ?', {query})

    if result[1] ~= nil then
        local Target = QBCore.Functions.GetPlayerByCitizenId(result[1].citizenid)

        if Target ~= nil then
            local targetPhone = getPhoneFromId(Target.PlayerData.source)

            if data.number == Player.PlayerData.charinfo.account then return srcPhone.notify("bank", "Tranfer", "You can't send money to yourself") end

            if Player.Functions.RemoveMoney('bank', data.amount, "phone-transfered-to-" .. Target.PlayerData.citizenid) then
                srcPhone.notify("bank", "Tranfer", "You sent ".. data.amount .." to ".. Target.PlayerData.charinfo.firstname .. " " .. Target.PlayerData.charinfo.lastname)
                targetPhone.notify("bank", "Transfer", Player.PlayerData.charinfo.firstname .. " ".. Player.PlayerData.charinfo.lastname .. "received ".. data.amount)                
                Target.Functions.AddMoney('bank', data.amount, "phone-transfered-from-" .. Player.PlayerData.citizenid)
                exports["nBanking"]:addPlayerHistory(Player.PlayerData.citizenid, {
                    amount = data.amount,
                    date = os.time(),
                    message = "",
                    title = "Outgoing money",
                    type = false
                })
                exports["nBanking"]:addPlayerHistory(Target.PlayerData.citizenid, {
                    amount = data.amount,
                    date = os.time(),
                    message = "",
                    title = "Incoming money",
                    type = true
                })
            end
        end
    end
end)                

Phone.RegisterEvent("nPhone:payBill", function(src, data)
    local Player = QBCore.Functions.GetPlayer(src)
    local phone = getPhoneFromId(src)
    
    exports["vivum-billing"]:PayInvoice(src, data, function(res)
        if res.status == "OK" then
            phone.notify("bank", "Banka", "Fatura ödeme işleminiz tamamlandı")
            TriggerClientEvent("nPhone:bank:UpdateBills", src)
        else
            phone.notify("bank", "Banka", "Fatura ödeme işleminiz sırasında bir hata meydana geldi")
        end
        -- print(res.status) -- OK or FAILED
    end)
end)

Phone.RegisterEvent("nPhone:getBills", function(src)
    p = promise.new()

    exports["vivum-billing"]:FetchInvoices(source, "received", { id = "__me", label = "Me" }, function(res)
        p:resolve(res)
    end)

    return Citizen.Await(p)

end)
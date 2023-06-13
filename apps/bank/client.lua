local QBCore = exports['qb-core']:GetCoreObject()

RegisterNUICallback("getBankDetails", function(data, cb)
    print("sasaas")
    QBCore.Functions.TriggerCallback(
        'nBanking:server:GetPlayerAccounts',
        function (result) 
            -- SetNuiFocus(true, true);
            print(result, {indent = true})
            SendReactMessage('setBank', result);
        end
    )
end)

function updateBank()
    QBCore.Functions.TriggerCallback('nBanking:server:GetPlayerAccounts', function (result)
        print(json.encode(result))
        SendReactMessage('setBank', result);
    end)
end

RegisterNUICallback("payBill", function(data, cb)
    local data = Phone.TriggerServerEvent("nPhone:payBill", data)

end)

RegisterNUICallback("sendTransfer", function(data, cb)
    data.citizenId = QBCore.Functions.GetPlayerData().citizenid
    TriggerServerEvent('nBanking-server:money-action', data);

end)

RegisterNetEvent("nBanking:update-client", function()
    print("updateing")
    QBCore.Functions.TriggerCallback('nBanking:server:UpdatePlayerAccounts', function (result)
        print(json.encode(result))
        SendReactMessage('setBank', result);
    end)
end)


RegisterNetEvent("nPhone:bank:UpdateBills", function()
    local bills = Phone.TriggerServerEvent("nPhone:getBills")
    if not bills then return end

    SendReactMessage("setBills", bills.invoices)
end)

RegisterNUICallback("getBills", function(data, cb)
    local bills = Phone.TriggerServerEvent("nPhone:getBills")
    if not bills then cb({}) return end

    cb(bills.invoices)
    -- print(json.encode(bills, {indent = true}))
end)
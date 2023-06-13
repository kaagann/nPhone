


RegisterNUICallback("getPlayerCompanies", function(_, cb)
    local PlayerData = QBCore.Functions.GetPlayerData()
    local PlayerJob = PlayerData.job
    local companies = {}
    if PlayerJob.isboss then
        table.insert(companies, {
            name = PlayerJob.label
        })
    end
    print(json.encode(companies))
    cb(companies)
end)

RegisterNUICallback("getEmployeList", function(data, cb)
    local PlayerData = QBCore.Functions.GetPlayerData()
    local PlayerJob = PlayerData.job
    QBCore.Functions.TriggerCallback('qb-bossmenu:server:GetEmployees', function(value)
        cb(value)
    end, PlayerJob.name)
end)

RegisterNUICallback("fireEmploye", function(data,cb)
    TriggerServerEvent("qb-bossmenu:server:FireEmployee", data)
end)

RegisterNUICallback("getGrades", function(data, cb)
    local PlayerData = QBCore.Functions.GetPlayerData()
    local PlayerJob = PlayerData.job
    local grades = QBCore.Shared.Jobs[PlayerJob.name].grades
    local format = {}

    for k,v in pairs(grades) do
        v.level = k
        table.insert(format, v)
    end

    cb(format)
end)

RegisterNUICallback("setGrade", function(data,cb)
    TriggerServerEvent("qb-bossmenu:server:GradeUpdate", {
        cid = data.source,
        grade = tonumber(data.grade.level),
        gradename = data.grade.name
    })
end)
CreateThread(function()
    while true do
        Wait(60000 * 0.1)

        for k,v in pairs(phones) do 
            savePhone(v)
        end

        -- print("^5[Phone]^7 All Phones Saved!")
    end
end)
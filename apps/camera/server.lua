Phone.RegisterEvent("nPhone:addPhoto", function(src, url)
    local phone = getPhoneFromId(src)
    local photos = phone.getGallery()
    
    table.insert(photos, {
        id = #photos + 1,
        url = url
    })

    MySQL.query("UPDATE phone SET gallery = @gallery WHERE phone_number = @phone_number", {
        ["@gallery"] = json.encode(photos),
        ["@phone_number"] = phone.number
    })
end)

Phone.RegisterEvent("nPhone:removePhoto", function(src, id)
    local phone = getPhoneFromId(src)
    local photos = phone.getGallery()

    table.remove(photos, tonumber(id))

    phone.setGallery(photos)
end)

Phone.RegisterEvent("nPhone:getPhotos", function(src)
    local phone = getPhoneFromId(src)

    return phone.getGallery()
end)
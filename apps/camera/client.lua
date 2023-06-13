local phone = false
local frontCam = false

RegisterNUICallback("openCamera", function()
	open(false)
    CreateMobilePhone(0)
	CellCamActivate(true, true)
	phone = true
end)

Citizen.CreateThread(function()
	DestroyMobilePhone()
	local letSleep = true
	while true do
		Citizen.Wait(0)
				
		if IsControlJustPressed(1, 177) and phone == true then -- CLOSE PHONE
			letSleep = false
			DestroyMobilePhone()
			phone = false
			CellCamActivate(false, false)
			if firstTime == true then 
				firstTime = false 
				Citizen.Wait(2500)
				displayDoneMission = true
			end
		end

		if IsControlJustPressed(1, 191) and phone == true then
            exports['screenshot-basic']:requestScreenshotUpload(tostring(Config.Webhooks.Camera), "files[]", function(data)
                local image = json.decode(data)
                letSleep = false
                DestroyMobilePhone()
                phone = false
                CellCamActivate(false, false)

				open(true)
				SendReactMessage("setGalleryPage")
				SendReactMessage("setMessagesPhoto", image.attachments[1].proxy_url)
				Phone.TriggerServerEvent("nPhone:addPhoto", image.attachments[1].proxy_url)
            end)
        end
		
		if IsControlJustPressed(1, 27) and phone == true then -- SELFIE MODE
			letSleep = false
			frontCam = not frontCam
			CellFrontCamActivate(frontCam)
		end
			
		if phone == true then	
			letSleep = false
			HideHudComponentThisFrame(7)
			HideHudComponentThisFrame(8)
			HideHudComponentThisFrame(9)
			HideHudComponentThisFrame(6)
			HideHudComponentThisFrame(19)
			HideHudAndRadarThisFrame()
		end
			
		ren = GetMobilePhoneRenderId()
		SetTextRenderId(ren)
		
		-- Everything rendered inside here will appear on your phone.
		
		SetTextRenderId(1) -- NOTE: 1 is default
		if letSleep then
			Citizen.Wait(1500)
		end
	end
end)

function CellFrontCamActivate(activate)
	return Citizen.InvokeNative(0x2491A93618B7D838, activate)
end

RegisterNUICallback("getPhotos", function(data, cb)
	local photos = Phone.TriggerServerEvent("nPhone:getPhotos")

	cb(photos)
end)

RegisterNUICallback("removePhoto", function(data, cb)
	Phone.TriggerServerEvent("nPhone:removePhoto", data.id)
	local photos = Phone.TriggerServerEvent("nPhone:getPhotos")

	SendReactMessage("setPhotos", photos)
end)
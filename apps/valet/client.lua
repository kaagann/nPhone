
local inVehicle = false
local valeOn = false
local left = false
local fizzPed = nil
local spawnRadius = 10.0

local Colours = {
    ['0'] = "Metallic Black",
    ['1'] = "Metallic Graphite Black",
    ['2'] = "Metallic Black Steel",
    ['3'] = "Metallic Dark Silver",
    ['4'] = "Metallic Silver",
    ['5'] = "Metallic Blue Silver",
    ['6'] = "Metallic Steel Gray",
    ['7'] = "Metallic Shadow Silver",
    ['8'] = "Metallic Stone Silver",
    ['9'] = "Metallic Midnight Silver",
    ['10'] = "Metallic Gun Metal",
    ['11'] = "Metallic Anthracite Grey",
    ['12'] = "Matte Black",
    ['13'] = "Matte Gray",
    ['14'] = "Matte Light Grey",
    ['15'] = "Util Black",
    ['16'] = "Util Black Poly",
    ['17'] = "Util Dark silver",
    ['18'] = "Util Silver",
    ['19'] = "Util Gun Metal",
    ['20'] = "Util Shadow Silver",
    ['21'] = "Worn Black",
    ['22'] = "Worn Graphite",
    ['23'] = "Worn Silver Grey",
    ['24'] = "Worn Silver",
    ['25'] = "Worn Blue Silver",
    ['26'] = "Worn Shadow Silver",
    ['27'] = "Metallic Red",
    ['28'] = "Metallic Torino Red",
    ['29'] = "Metallic Formula Red",
    ['30'] = "Metallic Blaze Red",
    ['31'] = "Metallic Graceful Red",
    ['32'] = "Metallic Garnet Red",
    ['33'] = "Metallic Desert Red",
    ['34'] = "Metallic Cabernet Red",
    ['35'] = "Metallic Candy Red",
    ['36'] = "Metallic Sunrise Orange",
    ['37'] = "Metallic Classic Gold",
    ['38'] = "Metallic Orange",
    ['39'] = "Matte Red",
    ['40'] = "Matte Dark Red",
    ['41'] = "Matte Orange",
    ['42'] = "Matte Yellow",
    ['43'] = "Util Red",
    ['44'] = "Util Bright Red",
    ['45'] = "Util Garnet Red",
    ['46'] = "Worn Red",
    ['47'] = "Worn Golden Red",
    ['48'] = "Worn Dark Red",
    ['49'] = "Metallic Dark Green",
    ['50'] = "Metallic Racing Green",
    ['51'] = "Metallic Sea Green",
    ['52'] = "Metallic Olive Green",
    ['53'] = "Metallic Green",
    ['54'] = "Metallic Gasoline Blue Green",
    ['55'] = "Matte Lime Green",
    ['56'] = "Util Dark Green",
    ['57'] = "Util Green",
    ['58'] = "Worn Dark Green",
    ['59'] = "Worn Green",
    ['60'] = "Worn Sea Wash",
    ['61'] = "Metallic Midnight Blue",
    ['62'] = "Metallic Dark Blue",
    ['63'] = "Metallic Saxony Blue",
    ['64'] = "Metallic Blue",
    ['65'] = "Metallic Mariner Blue",
    ['66'] = "Metallic Harbor Blue",
    ['67'] = "Metallic Diamond Blue",
    ['68'] = "Metallic Surf Blue",
    ['69'] = "Metallic Nautical Blue",
    ['70'] = "Metallic Bright Blue",
    ['71'] = "Metallic Purple Blue",
    ['72'] = "Metallic Spinnaker Blue",
    ['73'] = "Metallic Ultra Blue",
    ['74'] = "Metallic Bright Blue",
    ['75'] = "Util Dark Blue",
    ['76'] = "Util Midnight Blue",
    ['77'] = "Util Blue",
    ['78'] = "Util Sea Foam Blue",
    ['79'] = "Uil Lightning blue",
    ['80'] = "Util Maui Blue Poly",
    ['81'] = "Util Bright Blue",
    ['82'] = "Matte Dark Blue",
    ['83'] = "Matte Blue",
    ['84'] = "Matte Midnight Blue",
    ['85'] = "Worn Dark blue",
    ['86'] = "Worn Blue",
    ['87'] = "Worn Light blue",
    ['88'] = "Metallic Taxi Yellow",
    ['89'] = "Metallic Race Yellow",
    ['90'] = "Metallic Bronze",
    ['91'] = "Metallic Yellow Bird",
    ['92'] = "Metallic Lime",
    ['93'] = "Metallic Champagne",
    ['94'] = "Metallic Pueblo Beige",
    ['95'] = "Metallic Dark Ivory",
    ['96'] = "Metallic Choco Brown",
    ['97'] = "Metallic Golden Brown",
    ['98'] = "Metallic Light Brown",
    ['99'] = "Metallic Straw Beige",
    ['100'] = "Metallic Moss Brown",
    ['101'] = "Metallic Biston Brown",
    ['102'] = "Metallic Beechwood",
    ['103'] = "Metallic Dark Beechwood",
    ['104'] = "Metallic Choco Orange",
    ['105'] = "Metallic Beach Sand",
    ['106'] = "Metallic Sun Bleeched Sand",
    ['107'] = "Metallic Cream",
    ['108'] = "Util Brown",
    ['109'] = "Util Medium Brown",
    ['110'] = "Util Light Brown",
    ['111'] = "Metallic White",
    ['112'] = "Metallic Frost White",
    ['113'] = "Worn Honey Beige",
    ['114'] = "Worn Brown",
    ['115'] = "Worn Dark Brown",
    ['116'] = "Worn straw beige",
    ['117'] = "Brushed Steel",
    ['118'] = "Brushed Black Steel",
    ['119'] = "Brushed Aluminium",
    ['120'] = "Chrome",
    ['121'] = "Worn Off White",
    ['122'] = "Util Off White",
    ['123'] = "Worn Orange",
    ['124'] = "Worn Light Orange",
    ['125'] = "Metallic Securicor Green",
    ['126'] = "Worn Taxi Yellow",
    ['127'] = "Police Car Blue",
    ['128'] = "Matte Green",
    ['129'] = "Matte Brown",
    ['130'] = "Worn Orange",
    ['131'] = "Matte White",
    ['132'] = "Worn White",
    ['133'] = "Worn Olive Army Green",
    ['134'] = "Pure White",
    ['135'] = "Hot Pink",
    ['136'] = "Salmon pink",
    ['137'] = "Metallic Vermillion Pink",
    ['138'] = "Orange",
    ['139'] = "Green",
    ['140'] = "Blue",
    ['141'] = "Mettalic Black Blue",
    ['142'] = "Metallic Black Purple",
    ['143'] = "Metallic Black Red",
    ['144'] = "hunter green",
    ['145'] = "Metallic Purple",
    ['146'] = "Metallic Dark Blue",
    ['147'] = "Black",
    ['148'] = "Matte Purple",
    ['149'] = "Matte Dark Purple",
    ['150'] = "Metallic Lava Red",
    ['151'] = "Matte Forest Green",
    ['152'] = "Matte Olive Drab",
    ['153'] = "Matte Desert Brown",
    ['154'] = "Matte Desert Tan",
    ['155'] = "Matte Foilage Green",
    ['156'] = "Default Alloy Color",
    ['157'] = "Epsilon Blue",
    ['158'] = "Pure Gold",
    ['159'] = "Brushed Gold",
    ['160'] = "MP100"
}

function SpawnVehicle(vehicle, vehicleHash, plate)
	local coords = GetEntityCoords(PlayerPedId())
  	local found, spawnPos, spawnHeading = GetClosestVehicleNodeWithHeading(coords.x + math.random(-spawnRadius, spawnRadius), coords.y + math.random(-spawnRadius, spawnRadius), coords.z, 0, 3, 0)

    local driverhash = 999748158
    local vehhash = vehicleHash

    while not HasModelLoaded(driverhash) and RequestModel(driverhash) or not HasModelLoaded(vehhash) and RequestModel(vehhash) do
        RequestModel(driverhash)
        RequestModel(vehhash)
        Citizen.Wait(0)
    end

  	if found and HasModelLoaded(driverhash) then
		QBCore.Functions.SpawnVehicle(vehhash, function(callback_vehicle)
			fizz_veh = callback_vehicle
			QBCore.Functions.SetVehicleProperties(callback_vehicle, vehicle)
			SetVehRadioStation(callback_vehicle, "OFF")			
			fizzPed = CreatePedInsideVehicle(callback_vehicle, 26, driverhash, -1, true, false) 
			mechBlip = AddBlipForEntity(callback_vehicle)
			SetBlipSprite(mechBlip, 225)                                                      	--Blip Spawning.
			SetBlipFlashes(mechBlip, true) 
			SetBlipColour(mechBlip, 0) 
			Citizen.Wait(5000)
			SetBlipFlashes(mechBlip, false)  
			ClearAreaOfVehicles(GetEntityCoords(callback_vehicle), 5000, false, false, false, false, false);  
			SetVehicleOnGroundProperly(callback_vehicle)
			inVehicle = true
			TaskVehicle(callback_vehicle)
		end, {x = spawnPos.x, y = spawnPos.y, z = spawnPos.z + 1.0, h = 180.0})		
		valeOn = true
		
		while valeOn do 
			Citizen.Wait(500)
			if IsPedInVehicle(PlayerPedId(), fizz_veh, true) then
				RemoveBlip(mechBlip)
				valeOn = false
			end
		end
  	end
end

function TaskVehicle(vehicle)
	while inVehicle do
		Citizen.Wait(750)
		local pedcoords = GetEntityCoords(PlayerPedId())
		local plycoords = GetEntityCoords(fizzPed)
		local dist = GetDistanceBetweenCoords(plycoords, pedcoords.x,pedcoords.y,pedcoords.z, false)
		
		if dist <= 25.0 then
			TaskVehicleDriveToCoord(fizzPed, vehicle, pedcoords.x, pedcoords.y, pedcoords.z, 10.0, 1, vehhash, 786603, 5.0, 1)
			SetVehicleFixed(vehicle)
			if dist <= 7.5 then
				LeaveIt(vehicle)
			else
				Citizen.Wait(500)
			end
		else
			TaskVehicleDriveToCoord(fizzPed, vehicle, pedcoords.x, pedcoords.y, pedcoords.z, 15.0, 1, vehhash, 786603, 5.0, 1)
			Citizen.Wait(500)
		end
	end
end

function LeaveIt(vehicle)
	TaskLeaveVehicle(fizzPed, vehicle, 14)
    Config.Functions.AddKey(vehicle)
	inVehicle = false
	while IsPedInAnyVehicle(fizzPed, false) do
		Citizen.Wait(0)
	end 
	
	Citizen.Wait(500)
	TaskWanderStandard(fizzPed, 10.0, 10)
end

RegisterNUICallback("getVehicles", function(data, cb)
    local vehicles = Phone.TriggerServerEvent("nPhone:getVehicles")
    local vehs = {} 
    
    for i = 1, #vehicles, 1 do
        local mods = json.decode(vehicles[i].mods)

        if vehicles[i].state == 0 then
            table.insert(vehs, {
                name =  QBCore.Shared.Vehicles[vehicles[i].vehicle].name or "UNKNOWN",
                vehicle = vehicles[i].vehicle,
                plate = vehicles[i].plate,
                mods = mods,
                colors = {
                    first = Colours[tostring(mods.color1)],
                    secondary = Colours[tostring(mods.color2)]
                },
                stored = false
            })
        else
            table.insert(vehs, {
                name =  QBCore.Shared.Vehicles[vehicles[i].vehicle].name or "UNKNOWN",
                vehicle = vehicles[i].vehicle,
                plate = vehicles[i].plate,
                mods = mods,
                colors = {
                    first = Colours[tostring(mods.color1)],
                    secondary = Colours[tostring(mods.color2)]
                },
                stored = true
            })
        end
    end

    cb(vehs)
end)

RegisterNUICallback("spawnVehicle", function(data, cb)
    Notify("valet", "Valet", "Your vehicle is on the road", nil)
    SpawnVehicle(data.vehicle, data.vehicle.vehicle, data.plate)
end)
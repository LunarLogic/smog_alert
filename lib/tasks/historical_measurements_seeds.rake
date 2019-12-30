require 'csv'

namespace :database do
  desc 'Import measurements from old database'
  task import_old_measurements: :environment do
    csv_text = File.read(Rails.root.join('lib', 'old_db', 'measurements.csv'))
    csv = CSV.parse(csv_text, :headers => true)
    puts csv

    old_sensors_for_locations = [
      { location: { city: 'Aleksandrowice', street: nil }
        ids: [883]
      },
      { location: { city: 'Balice', street: 'Radziwiłłów' }
        id: [2274]
      },
      { location: { city: 'Bolechowice', street: 'Zielona' }
        id: [503]
      },
      { location: { city: 'Bolechowice', street: 'Szkolna' }
        id: [413]
      },
      { location: { city: 'Brzezie', street: 'Narodowa' }
        id: [397]
      },
      { location: { city: 'Brzezinka', street: nil }
        id: [513]
      },
      { location: { city: 'Morawica', street: 'Brzoskwinia' }
        id: [396, 3313]
      },
      { location: { city: 'Burów', street: nil }
        id: [490, 931]
      },
      { location: { city: 'Karniowice', street: nil }
        id: [514]
      },
      { location: { city: 'Kleszczów', street: nil }
        id: [489]
      },
      { location: { city: 'Kobylany', street: 'Jana Pawła II' }
        id: [412]
      },
      { location: { city: 'Kochanów', street: 'Droga Krajowa 79' }
        id: [515, 2904]
      },
      { location: { city: 'Młynka', street: nil }
        id: [510]
      },
      { location: { city: 'Niegoszowice', street: nil }
        id: [488, 3755]
      },
      { location: { city: 'Nielepice', street: 'Długa' }
        id: [392, 3075]
      },
      { location: { city: 'Nielepice', street: 'Józefa Trzaskowskiego' }
        id: [522, 967]
      },
      { location: { city: 'Pisary', street: nil }
        id: [516]
      },
      { location: { city: 'Radwanowice', street: '21 Lipca' }
        id: [486, 3089]
      },
      { location: { city: 'Rudawa', street: 'Polaczka' }
        id: [388]
      },
      { location: { city: 'Rząska', street: 'Krakowska' }
        id: [493]
      },
      { location: { city: 'Szczyglice', street: 'Sportowa' }
        id: [491]
      },
      { location: { city: 'Ujazd', street: 'Świerkowa' }
        id: [482]
      },
      { location: { city: 'Więckowice', street: 'Słoneczna' }
        id: [517, 2655]
      },
      { location: { city: 'Zabierzów', street: 'Przy Torze' }
        id: [521]
      },
      { location: { city: 'Zabierzów', street: 'Kolejowa' }
        id: []
      },
      { location: { city: 'Zabierzów', street: 'Wapienna' }
        id: [408, 2123]
      },
      { location: { city: 'Zelków', street: 'Krakowska' }
        id: [615]
      },
      { location: { city: 'Zelków', street: 'Jana Pawła II' }
      id: [411]
      }
    ]
  end
end

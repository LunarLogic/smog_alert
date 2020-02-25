class ApidocsController < ActionController::Base
  include Swagger::Blocks

  swagger_root do
    key :swagger, '2.0'
    info do
      key :version, '1.0.0'
      key :title, 'Smog Alert'
      key :description, 'API in Smog Alert project.'
      key :termsOfService, 'https://github.com/LunarLogic/smog_alert'
      contact do
        key :name, 'LunarLogic.io'
      end
      license do
        key :name, 'MIT'
      end
    end
    #tag do
      #key :name, 'pet'
      #key :description, 'Pets operations'
      #externalDocs do
        #key :description, 'Find more info in Smog Alert README'
        #key :url, 'https://github.com/LunarLogic/smog_alert'
      #end
    #end
    key :host, 'https://staging.smogalert.lunarlogic.io'
    key :basePath, '/'
    key :consumes, ['application/json']
    key :produces, ['application/json']
  end

  # A list of all classes that have swagger_* declarations.
  SWAGGERED_CLASSES = [
    API::Internal::ArticlesController,
    #Pet,
    #ErrorModel,
    self,
  ].freeze

  # WARNING: if you visit page /apidocs in the browser and you see error:
  #   The action 'index' could not be found for ApidocsController
  # It means you have error in code, for instance you added in SWAGGERED_CLASSES an invalid controller class name
  def index
    # Thanks to this header you will be able to load API page via Swagger page, visit:
    # http://petstore.swagger.io/?url=http://localhost:3000/apidocs
    headers['Access-Control-Allow-Origin'] = '*'

    render json: Swagger::Blocks.build_root_json(SWAGGERED_CLASSES)
  end
end

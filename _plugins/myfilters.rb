module Jekyll
  module MyFilters
    def file_date(input)
      File.mtime(input)
    end
    def jimaples(input)
    	'test'
    end
  end
end

Liquid::Template.register_filter(Jekyll::MyFilters)

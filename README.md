# koha-plugin-opac-marc-search
Add a MARC search form to the advanced search on the opac

This plugin will add a form to allow searching marc to the OPAC advanced search

Prerequisites:
 - You must be using Elastisearch as the search engine
 - ElasticsearchMARCFormat must be set to 'Searchable array'
 
The form can be toggled on the advanced search page, some notes"
 - you must supply a full tag/subfield and term to search 
 - you cannot search all subfields of a tag 
 - you cannot search controlfields

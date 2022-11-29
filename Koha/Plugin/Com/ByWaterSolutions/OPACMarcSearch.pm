package Koha::Plugin::Com::ByWaterSolutions::OPACMarcSearch;

use Modern::Perl;
use JSON qw(decode_json);

use C4::Context qw(preference);

use base qw(Koha::Plugins::Base);

## Here we set our plugin version
our $VERSION         = "{VERSION}";
our $MINIMUM_VERSION = "21.11.00";

## Here is our metadata, some keys are required, some are optional
our $metadata = {
    name            => 'OPAC MARC Plugin',
    author          => 'Nick Clemens',
    date_authored   => '2022-11-29',
    date_updated    => "1900-01-01",
    minimum_version => $MINIMUM_VERSION,
    maximum_version => undef,
    version         => $VERSION,
    description =>
      'This plugin adds the ability to search record MARC on the OPAC.',
};


sub new {
    my ( $class, $args ) = @_;

    ## We need to add our metadata here so our base class can access it
    $args->{'metadata'} = $metadata;
    $args->{'metadata'}->{'class'} = $class;

    ## Here, we call the 'new' method for our base class
    ## This runs some additional magic and checking
    ## and returns our actual $self
    my $self = $class->SUPER::new($args);

    return $self;
}

sub install {
    my ( $self, $args ) = @_;
    return 1;
}

sub uninstall() {
    my ( $self, $args ) = @_;
    return 1;
}

sub opac_js {
    my ( $self ) = @_;
    unless( C4::Context->preference('SearchEngine') eq 'Elasticsearch' && C4::Context->preference('ElasticsearchMARCFormat') eq 'ARRAY' ){
        return;
    }

    return q|
        <script src="/api/v1/contrib/opacmarcsearch/static/js/opac_marc_search.js"></script>
    |;
}

sub static_routes {
    my ( $self, $args ) = @_;

    my $spec_str = $self->mbf_read('staticapi.json');
    my $spec     = decode_json($spec_str);

    return $spec;
}

sub api_namespace {
    my ($self) = @_;

    return 'opacmarcsearch';
}

1;

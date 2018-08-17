#!/usr/local/bin/perl -w
#
# DecompileToTwee.pl SugarCube.HTML => tweego format with position tags
#
# (c) Andrew Svedby, 2018-02-03
# Licensed under same license as SugarCube

use strict;

die("No file argument") unless @ARGV;

my $game = $ARGV[0];
my $str = '';
my $br = "\cM\cJ";

{
    local $/ = $br;		# Separator is CRLF
    while (<>) {
	$str .= $_;		# Read HTML inte string
    }
}


die("No tw-storydata ifid") unless
    $str =~ m/<tw-storydata .*?\s+ifid="([^"]+)"/;
print ":: StorySettings${br}ifid:$1${br}${br}${br}";

die("No tw-storydata name") unless
    $str =~ m/<tw-storydata name="([^"]+)"/;
print ":: StoryTitle${br}$1${br}${br}${br}";

my $story_stylesheet = '';
$story_stylesheet = $1 if
    $str =~ m/<style role="stylesheet".*?>(.*?)<\/style>/s;

# Should this be done in the Fixup script?
$story_stylesheet =~ s/^\/\* twine-user-stylesheet .*$//m;

$story_stylesheet =~ s/($br)+$//s;
print ":: Story Stylesheet [stylesheet]${br}$story_stylesheet${br}${br}${br}";

my $story_javascript = '';
$story_javascript = $1 if
    $str =~ m/<script role="script".*?>(.*?)<\/script>/s;

# Should this be done in the Fixup script?
$story_javascript =~ s/^\/\* twine-user-script .*$//m;

$story_javascript =~ s/($br)+$//s;
print ":: Story JavaScript [script]${br}$story_javascript${br}${br}${br}";


# Iterate over passages, saving each to its own file
while ($str =~ m/<tw-passagedata\s+(.*?)>(.*?)<\/tw-passagedata>\\?(($br)+)/sg) {
#    print "$1\n";
    my $passage_data = $1;
    my $passage_text = $2;
    my $br_after = length($3) / 2;
    my $passage_tags = '';
    my $passage_name = 'ERROR!!! UNKNOWN PASSAGE NAME ERROR!!!';
    my @tags = ();

    $passage_name = $1 if
	$passage_data =~ m/name="([^"]+)"/;
    $passage_name =~ s/&#39;/'/g;
    
    unshift @tags, $1 if
	$passage_data =~ m/tags="([^"]+)"/;

    unshift @tags, "pos_$1_$2" if
	$passage_data =~ m/position="(\d+)(?:\.\d+)?,(\d+)(?:\.\d+)?"/;

#    unshift @tags, "br_after_$br_after" if
#	$br_after > 0;

# PE does not have unique pids, so can't preserve pid yet 
#    unshift @tags, "pid_$1" if $passage_data =~ m/pid="(\d+)"/;

    $passage_tags = ' [' . join(' ', @tags) . ']' if @tags;
    
    # Convert PE's funky HTML-comments
    $passage_text =~ s/<!--(.*?)-->&gt;\\/ $1 --&gt;\\/g;

    $passage_text =~ s/\s+$//g;	# Strip trailing spaces on each line
    $passage_text =~ s/&darr;/↓/g;
    $passage_text =~ s/&uarr;/↑/g;
    $passage_text =~ s/&larr;/←/g;
    $passage_text =~ s/&rarr;/→/g;
    $passage_text =~ s/&quot;/"/g;
    $passage_text =~ s/&amp;/&/g;
    $passage_text =~ s/&lt;/</g;
    $passage_text =~ s/&gt&gt;/>>/g; # Bug in PE. Should not be needed...
    $passage_text =~ s/&gt;/>/g;
    $passage_text =~ s/&#x27;/'/g; # Old style singel quote
    $passage_text =~ s/&#39;/'/g;
    $passage_text =~ s/($br)+$//s; # Strip trailing line breaks

    open(PASSAGE, '>', "${passage_name}.twee") or
	die("Failed to open passage file '$passage_name' for writing\n");
    print PASSAGE ":: $passage_name$passage_tags${br}$passage_text${br}${br}${br}";
    close(PASSAGE);
}


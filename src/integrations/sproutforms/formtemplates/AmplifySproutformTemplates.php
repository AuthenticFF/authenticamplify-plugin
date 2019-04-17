<?php

namespace authenticff\authenticamplify\integrations\sproutforms\formtemplates;

use barrelstrength\sproutforms\base\FormTemplates;
use Craft;

class AmplifySproutformTemplates extends FormTemplates
{
    public function getName(): string
    {
        return 'Amplify Custom Form Templates';
    }

    public function getPath(): string
    {
        return Craft::getAlias('@authenticff/authenticamplify/templates/_integrations/sproutforms/formtemplates/');
    }
}

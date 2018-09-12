<?php
namespace authenticff\authenticamplify;

use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

class AmplifyAssetBundle extends AssetBundle
{
    public function init()
    {
        // define the path that your publishable resources live
        $this->sourcePath = '@authenticff/authenticamplify/resources';

        // define the dependencies
        /*
        $this->depends = [
            CpAsset::class,
        ];
        */

        // define the relative path to CSS/JS files that should be registered with the page
        // when this asset bundle is registered
        $this->js = [
            'scripts/built/scripts.js',
        ];

        $this->css = [
            'styles/css/app.css',
        ];

        parent::init();
    }
}

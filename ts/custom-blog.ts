module Test
{
    export class TestClass
    {
        public MethodBlah(): void
        {
            jQuery(document).ready(function($) {
                console.log("hello world");
            });
        }
    }
}
new Test.TestClass().MethodBlah();
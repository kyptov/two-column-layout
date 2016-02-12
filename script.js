(function () {

    $(init);

    function init() {

        var $left = $('.left .inner');
        var $right = $('.right .inner');

        $('.elements').children().each(function () {

            var $this = $(this).detach();

            if ($this.hasClass('full')) {
                $left.append($this);
                return;
            }

            if ($left.height() <= $right.height()) {
                $left.append($this);
            } else {
                $right.append($this);
            }


        });

        $('.item').on('moveUp', moveUp).on('moveDown', moveDown).on('moveLeft', moveLeft).on('moveRight', moveRight);

        update();
    }

    function update() {

        $('.item.empty').remove();

        reflow();
        remap();
    }

    function reflow() {

        var $left = $('.left .inner');
        var $right = $('.right .inner');

        var $empty = $('<div>').addClass('item empty');

        $left.find('.full').each(function () {

            var $this = $(this);

            var rect = this.getBoundingClientRect();

            $right.find('.item').each(function () {

                var rightRect = this.getBoundingClientRect();

                if (rightRect.top <= rect.top && rect.top < rightRect.bottom) {

                    var rightOffset = rect.top - rightRect.top;

                    var leftOffset = rightRect.height - rightOffset;

                    if (leftOffset < rightOffset) {
                        $empty.clone().height(leftOffset).insertBefore($this);
                        $empty.clone().height(rect.height).insertAfter(this);
                    } else {
                        $empty.clone().height(rightOffset + rect.height).insertBefore(this);
                    }

                    return false;
                }

            });

        });

        if ($left.height() > $right.height()) {

            $left.find('.item').each(function () {

                var rightBottom = $right[0].getBoundingClientRect().bottom;

                if (this.getBoundingClientRect().top > rightBottom) {
                    $(this).detach().appendTo($right);
                }

            });

            return;
        }

        if ($left.height() < $right.height()) {

            $right.find('.item').each(function () {

                var leftBottom = $left[0].getBoundingClientRect().bottom;

                if (this.getBoundingClientRect().top > leftBottom) {
                    $(this).detach().appendTo($left);
                }

            });
        }
    }

    function remap() {

        var $left = $('.left .inner');
        var $right = $('.right .inner');

        $right.children().not('.empty').each(function (index) {

            var $this = $(this);

            $this.not('.pos-right').addClass('pos-right');
            $this.filter('.pos-left').removeClass('pos-left');

            if ($this.is(':last-child')) {
                $this.not('.pos-last').addClass('pos-last');
            } else {
                $this.filter('.pos-last').removeClass('pos-last');
            }

            if (index === 0) {
                $this.not('.pos-first').addClass('pos-first');
            } else {
                $this.filter('.pos-first').removeClass('pos-first');
            }
        });

        $left.children().not('.empty').each(function (index) {

            var $this = $(this);

            $this.not('.pos-left').addClass('pos-left');
            $this.filter('.pos-right').removeClass('pos-right');

            if ($this.is(':last-child')) {
                $this.not('.pos-last').addClass('pos-last');
            } else {
                $this.filter('.pos-last').removeClass('pos-last');
            }

            if (index === 0) {
                $this.not('.pos-first').addClass('pos-first');
            } else {
                $this.filter('.pos-first').removeClass('pos-first');
            }
        });
    }

    function moveUp() {

        var $this = $(this);

        if ($this.hasClass('pos-first')) {
            return;
        }

        $this.insertBefore($this.prev());

        update();
    }

    function moveDown() {

        var $this = $(this);

        if ($this.hasClass('pos-last')) {
            return;
        }

        $this.insertAfter($this.next());

        update();
    }

    function moveLeft() {

        var $this = $(this);

        if ($this.hasClass('pos-left') || $this.hasClass('full')) {
            return;
        }

        var rect = this.getBoundingClientRect();

        $('.left .inner').find('.item').each(function () {

            var leftRect = this.getBoundingClientRect();

            if (leftRect.top <= rect.top && rect.top < leftRect.bottom) {
                $this.insertBefore(this);
                return false;
            }
        });

        update();
    }

    function moveRight() {

        var $this = $(this);

        if ($this.hasClass('pos-right') || $this.hasClass('full')) {
            return;
        }

        var rect = this.getBoundingClientRect();

        $('.right .inner').find('.item').each(function () {

            var rightRect = this.getBoundingClientRect();

            if (rightRect.top <= rect.top && rect.top < rightRect.bottom) {
                $this.insertBefore(this);
                return false;
            }
        });

        update();
    }

})();
